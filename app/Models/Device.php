<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Device extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'company',
        'code',
        'budget',
        'serial_number',
        'brand',
        'description',
        'size',
        'processor_type',
        'processor_description',
        'ram_type',
        'ram_capacity',
        'vga_card',
        'os_type',
        'os_edition',
        'os_architecture',
        'os_licence',
        'office_licence',
        'purchase_date',
        'warranty_expiry_date',
        'price',
        'category_id',
        'supplier_id',
    ];

    /**
     * Get the category that owns the Asset
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Get the supplier that owns the Asset
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function supplier(): BelongsTo
    {
        return $this->belongsTo(Supplier::class);
    }

    /**
     * Get all of the assetTransaction for the Asset
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */

     /**
      * Get all of the assetStorage for the Asset
      *
      * @return \Illuminate\Database\Eloquent\Relations\HasMany
      */
    public function assetStorage(): HasMany
    {
        return $this->hasMany(AssetStorage::class);
    }
    
    public function transactions(): HasMany
    {
        return $this->hasMany(DeviceTransaction::class);
    }

    public function lastTransaction():HasOne
    {
        return $this->HasOne(DeviceTransaction::class, 'device_id')->latest();
    }

    /**
     * Get all of the workOrder for the Device
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function workOrder(): HasMany
    {
        return $this->hasMany(WorkOrder::class);
    }
}
