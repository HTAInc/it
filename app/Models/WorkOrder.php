<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class WorkOrder extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'request',
        'category',
        'other',
        'action',
        'status',
        'approved_at',
        'progress_at',
        'done_at',
        'device_id',
        'user_id',
        'leader_id',
        'pic_id',
        'know_id',
    ];
    
    /**
     * Get the user that owns the WorkOrder
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the leader that owns the WorkOrder
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function leader(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    
    /**
     * Get the pic that owns the WorkOrder
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function pic(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the know that owns the WorkOrder
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function know(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the device that owns the WorkOrder
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function device(): BelongsTo
    {
        return $this->belongsTo(Device::class);
    }
    
}
